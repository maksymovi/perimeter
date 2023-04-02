import numpy as np
from PIL import Image, ImageDraw

#minor utility to add grid lines to files
def add_grid_lines(filename, z):
    image = Image.open(filename).convert("RGBA")
    
    #new image for the grid lines
    grid = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(grid)
    
    #subgrid lines
    for x in range(0, image.width, image.width // z):
        for i in range(1, 10):
            draw.line([(x + i * image.width // (z * 10), 0), (x + i * image.width // (z * 10), image.height)],
                      fill=(128, 128, 128, 128), width=3)
    for y in range(0, image.height, image.height // z):
        for i in range(1, 10):
            draw.line([(0, y + i * image.height // (z * 10)), (image.width, y + i * image.height // (z * 10))],
                      fill=(128, 128, 128, 128), width=3)

    #main grid lines
    for x in range(0, image.width, image.width // z):
        draw.line([(x, 0), (x, image.height)], fill=(128, 128, 128, 192), width=5)
    for y in range(0, image.height, image.height // z):
        draw.line([(0, y), (image.width, y)], fill=(128, 128, 128, 192), width=5)
    
    #blend the grid lines with the original image
    blended = Image.alpha_composite(image, grid)
    blended.save("grid_" + filename)


add_grid_lines("erangel.png", 8)