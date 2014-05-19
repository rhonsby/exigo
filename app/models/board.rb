# == Schema Information
#
# Table name: boards
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class Board < ActiveRecord::Base
  validates :title, presence: true

  has_many :board_assignments, inverse_of: :board
  has_many :cards, through: :lists
  has_many :lists, dependent: :destroy
  has_many :members,
    through: :board_assignments,
    source: :user,
    inverse_of: :boards

  def self.for_member(user)
    joins(:board_assignments).where("board_assignments.user_id = ?", user.id)
  end

  def create_standard_lists!
    self.lists.create!(title: 'To Do', rank: 1)
    self.lists.create!(title: 'Doing', rank: 2)
    self.lists.create!(title: 'Done', rank: 3)
  end
end
