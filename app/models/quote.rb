class Quote < ApplicationRecord
  belongs_to :user
  belongs_to :entity

  has_many :bars, as: :barable, dependent: :destroy
end

