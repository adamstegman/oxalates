require 'rails_helper'

describe List, type: :model do
  after do
    Food.destroy_all
    List.destroy_all
  end

  describe '.for_food' do
    it "finds the list whose thresholds the food falls between" do
      List.create!(name: "Low", bottom_threshold: 1, top_threshold: 5)
      moderate = List.create!(name: "Moderate", bottom_threshold: 5, top_threshold: 15)
      List.create!(name: "High", bottom_threshold: 15, top_threshold: 50)
      food = Food.create!(name: "anything", oxalate_mg: 10)
      expect(described_class.for_food(food)).to eq(moderate)
    end

    context "when a list is unbounded and includes the food" do
      it "returns the list" do
        high = List.create!(name: "High", bottom_threshold: 15)
        food = Food.create!(name: "anything", oxalate_mg: 100)
        expect(described_class.for_food(food)).to eq(high)
      end
    end

    context "when multiple lists match" do
      it "returns the higher list" do
        List.create!(name: "Low/Moderate", bottom_threshold: 1, top_threshold: 10)
        moderate = List.create!(name: "Moderate", bottom_threshold: 5, top_threshold: 15)
        food = Food.create!(name: "anything", oxalate_mg: 9)
        expect(described_class.for_food(food)).to eq(moderate)
      end

      context "when a list is unbounded" do
        it "returns the upper unbounded list" do
          List.create!(name: "Low/Moderate", top_threshold: 10)
          moderate = List.create!(name: "Moderate/High", bottom_threshold: 5)
          food = Food.create!(name: "anything", oxalate_mg: 9)
          expect(described_class.for_food(food)).to eq(moderate)
        end
      end
    end

    context "when no list matches" do
      it "returns a null list" do
        food = Food.create!(name: "anything", oxalate_mg: 10)
        expect(described_class.for_food(food)).to respond_to(:name)
      end
    end
  end
end
