require "rails_helper"

RSpec.describe Food, type: :model do
  describe '.for_list' do
    it "finds the foods whose oxalate content falls between the list's thresholds" do
      Food.create!(name: "too-low", oxalate_mg: 1)
      Food.create!(name: "too-high", oxalate_mg: 100)
      Food.create!(name: "just-too-high", oxalate_mg: 15)
      foods = [
        Food.create!(name: "almost-low", oxalate_mg: 5),
        Food.create!(name: "just-right", oxalate_mg: 10),
      ]
      list = List.create!(name: "list", bottom_threshold: 5, top_threshold: 15)
      expect(described_class.for_list(list)).to match_array(foods)
    end

    context "when the list is unbounded" do
      it "contains all foods in the range" do
        low = Food.create!(name: "low", oxalate_mg: 1)
        moderate = Food.create!(name: "moderate", oxalate_mg: 15)
        high = Food.create!(name: "high", oxalate_mg: 100)
        low_list = List.create!(name: "low", top_threshold: 15)
        high_list = List.create!(name: "high", bottom_threshold: 15)
        all_list = List.create!(name: "all")
        expect(described_class.for_list(low_list)).to match_array([low])
        expect(described_class.for_list(high_list)).to match_array([moderate, high])
        expect(described_class.for_list(all_list)).to match_array([low, moderate, high])
      end
    end
  end
end
