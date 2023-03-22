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

  actions :all, :except => [:destroy, :new, :create, :edit, :update]

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
    link_to 'Cancel Subscription', cancel_admin_subscription_path(resource) if resource.cancelled_at.blank?
  end

  index do
    selectable_column
    id_column
    column :user
    column :title
    column :stripe_subscription_id
    column :created_at
    column :updated_at
    column :cancelled_at

    actions defaults: %i[show] do |sub|
      if sub.cancelled_at.blank?
        item "Cancel Subscription", cancel_admin_subscription_path(sub), data: { confirm: "Are you sure you want to cancel this subscription?" }
      end
    end
  end

end
