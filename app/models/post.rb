class Post < ApplicationRecord
  belongs_to :user
  has_many :replies, dependent: :destroy
  has_one_attached :image
  has_one_attached :video

  has_many :likes, as: :likeable, dependent: :destroy


end
