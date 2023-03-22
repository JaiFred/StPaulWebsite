ActiveAdmin.register Subscription do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :user_id, :stripe_subscription_id, :title, :cancelled_at
  #
  # or
  #
  # permit_params do
  #   permitted = [:user_id, :stripe_subscription_id, :title, :cancelled_at]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  member_action :cancel do    
    Stripe::Subscription.update(
      resource.stripe_subscription_id,
      {
        cancel_at_period_end: true
      }
    )

    resource.update!(cancelled_at: DateTime.current)

    redirect_to admin_subscriptions_path, notice: "Subscription Cancelled Successfully!"
  end

  action_item :cancel, only: %i[show] do
    link_to 'Cancel Subscription', cancel_admin_subscription_path(resource)
  end


  # action_item :cancel do
  #   link_to 'Cancel Subscription', cancel_subscription_path(resource)
  # end

  # member_action :cancel do
  # end
  
end
