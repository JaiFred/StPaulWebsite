# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  first_name :string
#  last_name  :string
#  email      :string
#  password   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

    has_many :events
    has_many :subscriptions, dependent: :destroy
  
  PASSWORD_FORMAT_1 = /\A
    (?=.{6,})          # Must contain 6 or more characters
  /x

  PASSWORD_FORMAT_2 = /\A    
    (?=.*\d)           # Must contain a digit
  /x
  PASSWORD_FORMAT_3 = /\A
    (?=.*[a-z])        # Must contain a lower case character
    (?=.*[A-Z])        # Must contain an upper case character    
  /x

  PASSWORD_FORMAT_4 = /\A
  (?=.*[[:^alnum:]]) # Must contain a symbol
  /x


  validates :first_name, :last_name, presence: true
  validates :email, format: { with: Devise::email_regexp, message: 'must be valid' }

  validates :password,
    presence: true, 
    length: { in: Devise.password_length }, 
    format: { with: PASSWORD_FORMAT_1, message: 'Must contain 6 or more characters' },
    confirmation: true

  validates :password,
    presence: true, 
    length: { in: Devise.password_length }, 
    format: { with: PASSWORD_FORMAT_2, message: 'Must contain a digit' },
    confirmation: true
    

  validates :password,
    presence: true, 
    length: { in: Devise.password_length }, 
    format: { with: PASSWORD_FORMAT_3, message: 'Must contain a lower case and upper case character' },
    confirmation: true   

  validates :password,
    presence: true, 
    length: { in: Devise.password_length }, 
    format: { with: PASSWORD_FORMAT_4, message: 'Must contain a symbol' },
    confirmation: true

end
