# frozen_string_literal: true

module Api
  class PaymentsController < ApplicationController
    before_action :authenticate_user!, only: %i[create update destroy]

    # be able to delete membership to website - unsignup
    # Make request to cancel subscriptions
    # Make cancel recurring payments button on front-end

    PLANS = {
      # monthly rates
      '5_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_5',nil),
      '10_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_10',nil),
      '15_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_15',nil),
      '20_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_20',nil),
      '25_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_25',nil),
      '30_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_30',nil),
      '35_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_35',nil),
      '40_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_40',nil),
      '45_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_45',nil),
      '50_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_50',nil),
      '55_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_55',nil),
      '60_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_60',nil),
      '65_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_65',nil),
      '70_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_70',nil),
      '75_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_75',nil),
      '80_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_80',nil),
      '85_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_85',nil),
      '90_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_90',nil),
      '95_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_95',nil),
      '100_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_100',nil),
      '150_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_150',nil),
      '200_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_200',nil),
      '250_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_250',nil),
      '300_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_300',nil),
      '350_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_350',nil),
      '400_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_400',nil),
      '450_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_450',nil),
      '500_dollars_Monthly' => ENV.fetch('DOLLARS_MONTHLY_500',nil),

      # weekly rates
      '5_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_5', nil),
      '10_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_10', nil),
      '15_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_15', nil),
      '20_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_20', nil),
      '25_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_25',nil),
      '30_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_30',nil),
      '35_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_35',nil),
      '40_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_40',nil),
      '45_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_45',nil),
      '50_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_50',nil),
      '55_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_55',nil),
      '60_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_60',nil),
      '65_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_65',nil),
      '70_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_70',nil),
      '75_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_75',nil),
      '80_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_80',nil),
      '85_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_85',nil),
      '90_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_90',nil),
      '95_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_95',nil),
      '100_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_100',nil),
      '150_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_150',nil),
      '200_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_200',nil),
      '250_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_250',nil),
      '300_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_300',nil),
      '350_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_350',nil),
      '400_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_400',nil),
      '450_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_450',nil),
      '500_dollars_Weekly' => ENV.fetch('DOLLARS_WEEKLY_500',nil),

      # biweekly rates
      '5_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_5',nil),
      '10_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_10',nil),
      '15_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_15',nil),
      '20_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_20',nil),
      '25_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_25',nil),
      '30_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_30',nil),
      '35_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_35',nil),
      '40_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_40',nil),
      '45_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_45',nil),
      '50_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_50',nil),
      '55_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_55',nil),
      '60_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_60',nil),
      '65_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_65',nil),
      '70_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_70',nil),
      '75_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_75',nil),
      '80_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_80',nil),
      '85_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_85',nil),
      '90_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_90',nil),
      '95_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_95',nil),
      '100_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_100',nil),
      '150_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_150',nil),
      '200_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_200',nil),
      '250_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_250',nil),
      '300_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_300',nil),
      '350_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_350',nil),
      '400_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_400',nil),
      '450_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_450',nil),
      '500_dollars_BiWeekly' => ENV.fetch('DOLLARS_BIWEEKLY_500',nil),
    }.freeze

    FREQUENCY_HASH = {
      'Monthly' => 28,
      'Weekly' => 7,
      'BiWeekly' => 14
    }.freeze

    def client_secret_recurring
      # TODO: think about proper authentication

      Rails.logger.debug { "PARAMS: #{params.inspect}" }
      Rails.logger.debug { "params[:amount]: #{params[:amount]}" }

      if params[:amount].blank? || params[:amount] == 'null'
        render json: { error: 'Amount cant be blank' }, status: :unprocessable_entity
        return
      end

      amount = params[:amount].to_i * 100

      Rails.logger.debug { "amount: #{amount}" }

      intent = Stripe::PaymentIntent.create(
        {
          amount: amount,
          currency: 'usd',
          payment_method_types: ['card']
        }
      )

      Rails.logger.debug { "intent.client_secret: #{intent.client_secret.inspect}" }

      render json: { client_secret: intent.client_secret }.to_json
      rescue Stripe::CardError, Stripe::InvalidRequestError, StandardError => ex
      Sentry.capture_message(ex.message, backtrace: caller)
      render json: { errors: ex.message }, status: :unprocessable_entity
    end

    def client_secret
      # TODO: think about proper authentication

      Rails.logger.debug { "PARAMS: #{params.inspect}" }
      Rails.logger.debug { "params[:amount]: #{params[:amount]}" }

      if params[:amount].blank? || params[:amount] == 'null'
        render json: { error: 'Amount cant be blank' }, status: :unprocessable_entity
        return
      end

      amount = (params[:amount].to_f * 100).to_i

      Rails.logger.debug { "amount: #{amount}" }

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
        }
      )

      Rails.logger.debug { "intent.client_secret: #{intent.client_secret.inspect}" }

      render json: { client_secret: intent.client_secret }.to_json
    rescue Stripe::CardError, Stripe::InvalidRequestError, StandardError => ex
      Sentry.capture_message(ex.message, backtrace: caller)
      render json: { errors: ex.message }, status: :unprocessable_entity
    end

    def payment_subscription
      # get payment_method_id from front end: params[:payment_method]
      # get price id from front end: params[:price_id]
      # billing date every month from the front end: params[:day_of_month_to_charge]
      # params[:billing_details]

      Rails.logger.debug { "PARAMS: #{params.inspect}" }

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

      plan_id_key = "#{params[:amount].gsub('$', '')}_dollars_#{params[:frequency]}"
      Rails.logger.debug { "plan_id_key: #{plan_id_key.inspect}" }

      plan = PLANS[plan_id_key]
      Rails.logger.debug { "plan: #{plan.inspect}" }

      payment_start_date = Date.parse(params[:payment_start_date])

      # binding.pry # lets start from here....tomorrow 8pm or tonight after

      natural_billing_date = DateTime.current

      billing_cycle_anchor = case params[:frequency]
                             when 'Monthly'
                               natural_billing_date += 1.month

                               if DateTime.now.day <= payment_start_date.day && DateTime.now.year == payment_start_date.year && DateTime.now.month == payment_start_date.month
                                 (DateTime.now.next_month.beginning_of_month + (params[:payment_date].to_i - 1).days).to_time.to_i
                               elsif payment_start_date.day > params[:payment_date].to_i
                                 # binding.pry
                                 (payment_start_date.next_month.beginning_of_month + (params[:payment_date].to_i - 1).days).to_time.to_i
                               else
                                 (payment_start_date.beginning_of_month + (params[:payment_date].to_i - 1).days).to_time.to_i
                               end
                             when 'Weekly'
                               natural_billing_date += 1.week

                               if payment_start_date.strftime('%A').downcase == params[:weekday].downcase
                                 payment_start_date
                               else
                                 payment_start_date.next_occurring(params[:weekday].downcase.to_sym)
                               end.to_time.to_i

                             when 'BiWeekly'
                               natural_billing_date += 2.weeks

                               if DateTime.now.year == payment_start_date.year && DateTime.now.month == payment_start_date.month && payment_start_date.strftime('%d').to_i > params[:biweekly_payment_date].to_i
                                 (payment_start_date.next_month.beginning_of_month + (params[:biweekly_payment_date].to_i - 1).days).to_time.to_i
                               elsif payment_start_date.strftime('%d').to_i > params[:biweekly_payment_date].to_i
                                 (payment_start_date.next_month.beginning_of_month + (params[:biweekly_payment_date].to_i - 1).days).to_time.to_i
                               elsif payment_start_date.strftime('%d').to_i == params[:biweekly_payment_date].to_i
                                 payment_start_date.to_time.to_i
                               else
                                 (payment_start_date.beginning_of_month + (params[:biweekly_payment_date].to_i - 1).days).to_time.to_i
                               end
                             end

      Rails.logger.debug { "billing_cycle_anchor #{Time.zone.at billing_cycle_anchor}" }
      Rails.logger.debug { "natural_billing_date: #{natural_billing_date}" }

      if Time.zone.at(billing_cycle_anchor) <= natural_billing_date
        response = Stripe::Subscription.create({ customer: customer.id,
                                                 items: [
                                                   { price: plan }
                                                 ],
                                                 billing_cycle_anchor: billing_cycle_anchor,
                                                 proration_behavior: 'none' })
        user.subscriptions.create!(stripe_subscription_id: response.id, title: plan_id_key.gsub('_', ' '))
      else
        # TODO: Future subscriptions can be visible in the profile as well
        # TODO show next payment date
        # TODO Changing the date formated in payment button
        # TODO nil frequency should be denied
        # TODO nil amount should be denied
        # // Cancel subscriptions is deleting random subscriptions - not the ones we choose...

        FutureSubscription.create!(
          user_id: user.id,
          payment_start_date: Time.zone.at(billing_cycle_anchor).to_date,
          billing_cycle_anchor: billing_cycle_anchor,
          plan: plan,
          title: plan_id_key.gsub('_', ' '),
          frequency: FREQUENCY_HASH[params[:frequency]]
        )
      end

      # TODO: avoid paying for a partial invoice before an actual billing anchor date
      # example: https://dashboard.stripe.com/test/subscriptions/sub_1MFUAVLKt794Fmx8FtLFbJDm

      # https://stripe.com/docs/billing/subscriptions/billing-cycle
      render json: { subscription: response }, status: :ok

    rescue Stripe::CardError, Stripe::InvalidRequestError, StandardError => ex
      # binding.pry
      Sentry.capture_message(ex.message, backtrace: caller)
      render json: { errors: ex.message }, status: :unprocessable_entity
    end

    def cancel_subscription
      subscription = Subscription.find(params[:subscription_id])
      Stripe::Subscription.update(
        subscription.stripe_subscription_id,
        {
          cancel_at_period_end: true
        }
      )

      subscription.update!(cancelled_at: DateTime.current)

      render json: { message: 'Subscription Cancelled Successsfully' }, status: :ok
    end
  end
end

# Stripe::Subscription.update(
#   subscription.stripe_subscription_id,
#   {
#     "trial_end" => (Time.current + 1.minute).to_i
#   }
# )
