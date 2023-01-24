class Image < ApplicationRecord
    has_one_attached :file
    # TOOD: image processing and resize
    # Options: See if Active Storage helps with hte image resize OR 
    # whether we have to use Shrine gem
    # 
end
