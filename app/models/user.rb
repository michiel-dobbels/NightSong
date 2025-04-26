class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

         has_many :friends
         has_many :posts, dependent: :destroy
         has_many :replies, dependent: :destroy
         has_many :likes, dependent: :destroy
         has_many :liked_posts, through: :likes, source: :post
         has_one_attached :profile_image
         has_one_attached :cover_image 

  has_many :active_follows, class_name: 'Follow', foreign_key: 'follower_id', dependent: :destroy
  has_many :passive_follows, class_name: 'Follow', foreign_key: 'followed_id', dependent: :destroy
  
  has_many :following, through: :active_follows, source: :followed
  has_many :followers, through: :passive_follows, source: :follower
  has_many :ratings

  has_many :quotes, dependent: :destroy

                 
end
