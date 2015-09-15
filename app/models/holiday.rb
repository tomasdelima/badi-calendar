class Holiday < ActiveRecord::Base
  def to_gregorian
    date
  end

  def to_badi
    date.to_badi
  end
end
