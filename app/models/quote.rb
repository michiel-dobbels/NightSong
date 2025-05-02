class Quote < ApplicationRecord
  belongs_to :user
  belongs_to :entity

  has_many :likes, as: :likeable

  def liked_by?(user)
    likes.exists?(user_id: user.id)
  end
  
end

