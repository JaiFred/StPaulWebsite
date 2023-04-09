class UserInvoiceMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_invoice_mailer.payment_failed.subject
  #
  def payment_failed(user, reason)
    @reason = reason
    @user = user

    mail to: @user.email
  end
end
