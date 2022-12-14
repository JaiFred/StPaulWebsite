module Api
    class PaymentsController < ApplicationController
        before_action :authenticate_user!, only: [ :create, :update, :destroy]

        # be able to delete membership to website - unsignup
        # Make request to cancel subscriptions
        # Make cancel recurring payments button on front-end

        PLANS = {
            # monthly rates
            '5_dollars_Monthly' => ENV['DOLLARS_MONTHLY_5'],
            '10_dollars_Monthly' => ENV['DOLLARS_MONTHLY_10'],
            '15_dollars_Monthly' => ENV['DOLLARS_MONTHLY_15'],
            '20_dollars_Monthly' => ENV['DOLLARS_MONTHLY_20'],
            '100_dollars_Monthly' => ENV['DOLLARS_MONTHLY_100'],
            # weekly rates
            '5_dollars_Weekly' => ENV['DOLLARS_WEEKLY_5'],
            '10_dollars_Weekly' => ENV['DOLLARS_WEEKLY_10'],
            '15_dollars_Weekly' => ENV['DOLLARS_WEEKLY_15'],
            '20_dollars_Weekly' => ENV['DOLLARS_WEEKLY_20'],
            '100_dollars_Weekly' => ENV['DOLLARS_WEEKLY_100'],
            # biweekly rates
            '5_dollars_BiWeekly' => ENV['DOLLARS_BIWEEKLY_5'],
            '10_dollars_BiWeekly' => ENV['DOLLARS_BIWEEKLY_10'],
            '15_dollars_BiWeekly' => ENV['DOLLARS_BIWEEKLY_15'],
            '20_dollars_BiWeekly' => ENV['DOLLARS_BIWEEKLY_20'],
            '100_dollars_BiWeekly' => ENV['DOLLARS_BIWEEKLY_100']
        }

        FREQUENCY_HASH = {
            'Monthly' => 28,
            'Weekly' => 7,
            'BiWeekly' => 14
        }

        def client_secret_recurring
            # TODO:  move secret keys to ENV variable
            # TODO: think about proper authentication

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
            # TODO: think about proper authentication

            puts "PARAMS: #{params.inspect}"
            puts "params[:amount]: #{params[:amount]}"

            if params[:amount].blank? || params[:amount] == 'null'
                render json: { error: 'Amount cant be blank' }, status: 422
                return
            end

            amount =  (params[:amount].to_f * 100).to_i

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

            payment_start_date = Date.parse(params[:payment_start_date])

            # binding.pry # lets start from here....tomorrow 8pm or tonight after

            natural_billing_date = DateTime.current

            billing_cycle_anchor = if params[:frequency] == 'Monthly'
                natural_billing_date += 1.month

                if DateTime.now.day <= payment_start_date.day && DateTime.now.year == payment_start_date.year &&  DateTime.now.month == payment_start_date.month
                    (DateTime.now.next_month.beginning_of_month + (params[:payment_date].to_i - 1).days).to_time.to_i
                else
                    # binding.pry
                    if payment_start_date.day > params[:payment_date].to_i
                        (payment_start_date.next_month.beginning_of_month + (params[:payment_date].to_i - 1).days).to_time.to_i
                    else
                        (payment_start_date.beginning_of_month + (params[:payment_date].to_i - 1).days).to_time.to_i
                    end
                end
            elsif params[:frequency] == 'Weekly'
                natural_billing_date += 1.week

                if payment_start_date.strftime("%A").downcase == params[:weekday].downcase
                    payment_start_date
                else
                    payment_start_date.next_occurring(params[:weekday].downcase.to_sym)
                end.to_time.to_i

            elsif params[:frequency] == 'BiWeekly'
                natural_billing_date += 2.weeks

                # todo: use payment_start_date
                # if DateTime.now.strftime("%d").to_i > params[:biweekly_payment_date].to_i
                #     (DateTime.now.beginning_of_month + (params[:biweekly_payment_date].to_i + 13).days).to_time.to_i
                # elsif DateTime.now.strftime("%d").to_i == params[:biweekly_payment_date].to_i
                #     DateTime.now.to_i
                # else
                #     (DateTime.now.beginning_of_month + (params[:biweekly_payment_date].to_i - 1).days).to_time.to_i
                # end

                # binding.pry

                if DateTime.now.year == payment_start_date.year && DateTime.now.month == payment_start_date.month && payment_start_date.strftime("%d").to_i > params[:biweekly_payment_date].to_i
                    (payment_start_date.next_month.beginning_of_month + (params[:biweekly_payment_date].to_i - 1).days).to_time.to_i
                elsif payment_start_date.strftime("%d").to_i > params[:biweekly_payment_date].to_i
                    (payment_start_date.next_month.beginning_of_month + (params[:biweekly_payment_date].to_i - 1).days).to_time.to_i
                elsif payment_start_date.strftime("%d").to_i == params[:biweekly_payment_date].to_i
                    payment_start_date.to_time.to_i
                else
                    (payment_start_date.beginning_of_month + (params[:biweekly_payment_date].to_i - 1).days).to_time.to_i
                end
            end

            puts "billing_cycle_anchor #{Time.at billing_cycle_anchor}"
            puts "natural_billing_date: #{natural_billing_date}"


            if Time.at(billing_cycle_anchor) <= natural_billing_date
                response = Stripe::Subscription.create({customer: customer.id,
                items: [
                    {price: plan},
                ],
                    billing_cycle_anchor: billing_cycle_anchor,
                    proration_behavior: 'none'
                })
                user.subscriptions.create!(stripe_subscription_id: response.id, title: plan_id_key.gsub("_", " "))
            else
                # TODO Future subscriptions can be visible in the profile as well
                # TODO show next payment date
                # TODO Changing the date formated in payment button
                # TODO nil frequency should be denied
                # TODO nil amount should be denied
                # // Cancel subscriptions is deleting random subscriptions - not the ones we choose...

                FutureSubscription.create!(
                    user_id: user.id,
                    payment_start_date: Time.at(billing_cycle_anchor).to_date,
                    billing_cycle_anchor: billing_cycle_anchor,
                    plan: plan,
                    title: plan_id_key.gsub("_", " "),
                    frequency: FREQUENCY_HASH[params[:frequency]]
                )
            end

            # TODO avoid paying for a partial invoice before an actual billing anchor date
            # example: https://dashboard.stripe.com/test/subscriptions/sub_1MFUAVLKt794Fmx8FtLFbJDm

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
