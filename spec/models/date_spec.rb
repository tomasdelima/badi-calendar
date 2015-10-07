require 'rails_helper'
require 'csv'

RSpec.describe Date, type: :model do
  let(:file) {
    raw_data = File.read(Rails.root.join("spec/uhj-reduced-dates/#{file_name}"))
    data = CSV.parse(raw_data, headers: true)
    data.map {|row| row.map {|k,v| row[k] = v.to_i} }
    data
  }

  describe '[BULK TEST] #to_badi' do
    context 'calculating the Naw-Ruz dates' do
      let(:file_name) { 'naw-ruz.csv' }

      it 'returns the correct badi date' do
        file.map do|row|
          badi_date = BadiDate.new(row['b-year'], row['b-month'], row['b-day'])
          gregorian_date = Date.new(row['g-year'], row['g-month'], row['g-day'])

          expect(gregorian_date.to_badi).to eq badi_date
        end
      end
    end

    context 'calculating the Nineteen Days Feasts dates' do
      let(:file_name) { 'reduced-nineteen-days-feasts.csv' }

      it 'returns the correct badi date' do
        file.map do |row|
          badi_date = BadiDate.new(row['b-year'], row['b-month'], row['b-day'])
          gregorian_date = Date.new(row['g-year'], row['g-month'], row['g-day'])

          expect(gregorian_date.to_badi).to eq badi_date
        end
      end
    end

    context 'calculating the Ayyám-i-Há dates' do
      let(:file_name) { 'ayyam-i-ha.csv' }

      it 'returns the correct badi date' do
        file.map do |row|
          first_gregorian_date = Date.new(row['g-year'], row['first-month'], row['first-day'])
          last_gregorian_date = Date.new(row['g-year'], row['last-month'], row['last-day'])

          first_badi_date = BadiDate.new(row['g-year'] - 1844, 18.5, 1)
          last_badi_date = BadiDate.new(row['g-year'] - 1844, 18.5, row['duration'].to_i)

          expect(first_gregorian_date.to_badi).to eq first_badi_date
          expect(last_gregorian_date.to_badi).to eq last_badi_date
        end
      end
    end
  end

  describe '#holiday?' do
    let(:gregorian_date) { Date.new(2020, 1, 5) }

    context 'when it is a holiday' do
      let!(:holiday) { Holiday.create(date: gregorian_date, name: 'Holiday Name') }

      it 'returns true' do
        expect(gregorian_date.holiday?).to eq true
      end
    end

    context 'when it is not a holiday' do
      it 'returns false' do
        expect(gregorian_date.holiday?).to eq false
      end
    end
  end
end
