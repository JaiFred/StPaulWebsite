# app/mailer_previews/devise_mailer_preview.rb
class DeviseMailerPreview < ActionMailer::Preview
    def confirmation_instructions
      Devise::Mailer.confirmation_instructions(User.first, {})
    end
  
    def unlock_instructions
      Devise::Mailer.unlock_instructions(User.first, "faketoken")
    end
  
    def reset_password_instructions
      Devise::Mailer.reset_password_instructions(User.first, "faketoken")
    end

    def payment_failed
      UserInvoiceMailer.payment_failed(User.first, reason = 'Invalid Card')
    end
end