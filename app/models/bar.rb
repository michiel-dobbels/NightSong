class Bar < ApplicationRecord
  belongs_to :user
  belongs_to :barable, polymorphic: true
end
