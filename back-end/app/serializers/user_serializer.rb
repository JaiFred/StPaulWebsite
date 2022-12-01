# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  first_name :string
#  last_name  :string
#  username   :string
#  email      :string
#  password   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :email, :admin
end
  