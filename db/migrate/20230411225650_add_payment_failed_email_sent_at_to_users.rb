class AddPaymentFailedEmailSentAtToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :payment_failed_email_sent_at, :datetime
  end
end
