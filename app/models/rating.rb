class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :entity

  validates :stars, presence: true, inclusion: { in: 1..5 }
  validates :user_id, uniqueness: { scope: :entity_id }
end
