class Reply < ApplicationRecord
  belongs_to :user
  belongs_to :post, optional: true
  belongs_to :parent, class_name: 'Reply', optional: true
  has_many :likes, as: :likeable, dependent: :destroy

  has_many :replies, class_name: 'Reply', foreign_key: 'parent_id', dependent: :destroy
end
