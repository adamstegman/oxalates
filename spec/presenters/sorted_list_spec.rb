require 'spec_helper'
require 'app/presenters/sorted_list'

describe SortedList do
  subject(:list) { described_class.new(model) }
  let(:model) { instance_double('List') }

  it "sorts the model's foods alphabetically and case-insensitively" do
    zzz = instance_double('Food', name: 'ZZZ')
    aaa = instance_double('Food', name: 'aaa')
    allow(model).to receive(:foods).and_return([zzz, aaa])

    expect(list.foods).to eq([aaa, zzz])
  end
end
