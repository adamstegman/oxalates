require 'forwardable'

class SortedList
  extend Forwardable

  delegate [:id, :name] => :list

  def initialize(list)
    @list = list
  end

  def foods
    list.foods.sort { |a, b| a.name.downcase <=> b.name.downcase }
  end

  private

  attr_reader :list
end
