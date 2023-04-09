# Preview all emails at http://localhost:3000/rails/mailers/user_invoice_mailer
class UserInvoiceMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/user_invoice_mailer/payment_failed
  def payment_failed
    UserInvoiceMailer.payment_failed
  end

end
