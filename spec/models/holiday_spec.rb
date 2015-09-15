require 'rails_helper'

RSpec.describe Holiday, type: :model do
  let(:gregorian_date) { Date.today }
  let(:badi_date)      { gregorian_date.to_badi }
  let(:holiday)        { Holiday.create(date: gregorian_date, name: 'Holiday Name') }

  describe '#to_gregorian' do
    it 'returns the converted gregorian date' do
      expect(holiday.to_gregorian).to eq gregorian_date
    end
  end

  describe '#to_badi' do
    it 'returns the converted badi date' do
      expect(holiday.to_badi).to eq badi_date
    end
  end
end
