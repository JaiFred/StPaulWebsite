class Bulletin < ApplicationRecord
  belongs_to :user
  belongs_to :calendar_year
end
