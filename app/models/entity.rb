class Entity < ApplicationRecord
  has_one_attached :profile_image
  has_one_attached :cover_photo
  has_many :follows, as: :followable, dependent: :destroy
  has_many :ratings
  has_many :quotes, dependent: :destroy

  def average_rating
    ratings.average(:stars).to_f.round(1) || 0.0
  end
  

  def rating_distribution
    ratings.group(:stars).count
  end

end
