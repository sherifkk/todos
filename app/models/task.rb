# frozen_string_literal: true

class Task < ApplicationRecord
  validates :title, presence: true
  belongs_to :user, required: true
  has_one_attached :attachment
  validate :deadline_cannot_be__past
  validate :read_only_record, on: :update

  def deadline_cannot_be__past
    if deadline_changed? && deadline < Date.today
      errors.add(:deadline, "can't be in the past")
    end
  end

  def read_only_record
    if completed_was
      errors.add("completed records are read only, can't update")
    end
  end
end
