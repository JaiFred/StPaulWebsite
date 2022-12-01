module Api
    class PaymentsController < ApplicationController
        before_action :authenticate_user, only: [ :create, :update, :destroy]

        # be able to delete membership to website - unsignup
        # Make request to cancel subscriptions 
        # Make cancel recurring payments button on front-end

        PLANS = {
            # monthly rates
            '100_dollars_Monthly' => ENV['DOLLARS_MONTHLY_100'],
            '20_dollars_Monthly' => ENV['DOLLARS_MONTHLY_20'],
            '10_dollars_Monthly' => ENV['DOLLARS_MONTHLY_10'],
            '5_dollars_Monthly' => ENV['DOLLARS_MONTHLY_5'],
            # weekly rates
            '10_dollars_Weekly' => ENV['DOLLARS_WEEKLY_10'],
            # biweekly rates
            '15_dollars_BiWeekly' => ENV['DOLLARS_BIWEEKLY_15'],
        }
        
        def client_secret_recurring
            # TODO:  move secret keys to ENV variable
            # TODO: think about proper authentication


            Stripe.api_key = ENV['STRIPE_SECRET_KEY']
            puts "PARAMS: #{params.inspect}"
            puts "params[:amount]: #{params[:amount]}"
            
            if params[:amount].blank? || params[:amount] == 'null'
                render json: { error: 'Amount cant be blank' }, status: 422
                return
            end

            amount =  params[:amount].to_i * 100

            puts "amount: #{amount}"

            intent = Stripe::PaymentIntent.create(
                {
                    amount: amount, 
                    currency: 'usd', 
                    payment_method_types: ['card']                    
                },
            )

            puts "intent.client_secret: #{intent.client_secret.inspect}"

            render json: { client_secret: intent.client_secret }.to_json
        end
        
        def client_secret
            # TODO:  move secret keys to ENV variable
            # TODO: think about proper authentication

            Stripe.api_key = ENV['STRIPE_SECRET_KEY']
            puts "PARAMS: #{params.inspect}"
            puts "params[:amount]: #{params[:amount]}"
            
            if params[:amount].blank? || params[:amount] == 'null'
                render json: { error: 'Amount cant be blank' }, status: 422
                return
            end

            amount =  params[:amount].to_i * 100

            puts "amount: #{amount}"

            customer = Stripe::Customer.create(
                email: params[:billing_details][:email],
                name: params[:billing_details][:name]
            )

            intent = Stripe::PaymentIntent.create(
                {
                    amount: amount, 
                    currency: 'usd', 
                    payment_method_types: ['card'],
                    customer: customer
                },
            )

            puts "intent.client_secret: #{intent.client_secret.inspect}"

            render json: { client_secret: intent.client_secret }.to_json
        end

        def payment_subscription
            require 'stripe'
            # TODO: move to ENV
            Stripe.api_key = ENV['STRIPE_SECRET_KEY']

            # get payment_method_id from front end: params[:payment_method]
            # get price id from front end: params[:price_id]
            # billing date every month from the front end: params[:day_of_month_to_charge]
            # params[:billing_details]

            puts "PARAMS: #{params.inspect}"

            # user has_name :subscription
            # Subscription: belongs_to :user


            user = User.find(params[:user_id])
            
            customer = Stripe::Customer.create(
                email: params[:billing_details][:email],
                name: params[:billing_details][:name],
                phone: params[:billing_details][:phone],
                payment_method: params[:payment_method_id], 
                invoice_settings: { default_payment_method: params[:payment_method_id] }
            )            

            user.update_column(:stripe_customer_id, customer.id)

            plan_id_key = "#{params[:amount].gsub("$", "")}_dollars_#{params[:frequency]}"
            puts "plan_id_key: #{plan_id_key.inspect}"
            
            plan = PLANS[plan_id_key]
            puts "plan: #{plan.inspect}"

            billing_cycle_anchor = if params[:frequency] == 'Monthly'
                (DateTime.now.next_month.beginning_of_month + (params[:payment_date].to_i - 1).days).to_time.to_i
            elsif params[:frequency] == 'Weekly'
                Date.today.next_occurring(params[:weekday].to_sym).to_time.to_i
            elsif params[:frequency] == 'BiWeekly'
                if DateTime.now.strftime("%d").to_i > params[:biweekly_payment_date].to_i
                    (DateTime.now.beginning_of_month + (params[:biweekly_payment_date].to_i + 13).days).to_time.to_i
                elsif DateTime.now.strftime("%d").to_i == params[:biweekly_payment_date].to_i
                    DateTime.now.to_i
                else
                    (DateTime.now.beginning_of_month + (params[:biweekly_payment_date].to_i - 1).days).to_time.to_i
                end
            end

            response = Stripe::Subscription.create({customer: customer.id,
            items: [
                {price: plan},
            ],                
                billing_cycle_anchor: billing_cycle_anchor
            })

            user.subscriptions.create!(stripe_subscription_id: response.id, title: plan_id_key.gsub("_", " "))

            # https://stripe.com/docs/billing/subscriptions/billing-cycle
            render json: { subscription: response }, status: :ok
        end

        def cancel_subscription
            subscription = Subscription.find(params[:subscription_id])
            Stripe::Subscription.update(
            subscription.stripe_subscription_id,
                {
                    cancel_at_period_end: true,
                }
            )

            subscription.update!(cancelled_at: DateTime.current)

            render json: { message: 'Subscription Cancelled Successsfully' }, status: :ok
        end
    end
end
