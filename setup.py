__author__ = 'Daniel Amador'
__version__ = '1.0'

# * Import libraries
from scripts.functions import Transformations

# Main menu
def menu():
    print('Choose one of the option below: \
         \n1> Load a new image. \
         \n2> Get RGB for a pixel \
         \n3> Get a region of interest \
         \n4> Resize an image  \
         \n5> Resize an image without change its aspect \
         \n6> Rotate an image  \
         \n7> Smoothing')
s



if __name__ == "__main__":
    try:
        print(
             "*************************************************\
            \n*      Welcome to Images Tranformation App      *\
            \n*************************************************")
        print('                    \.===./                  \
             \n                    | p q |                  \
             \n                     \_^_/                   \
             \n                    /| []|\                  \
             \n                  ()/|___|\()                \
             \n                     /| |\                   \
             \n                    (0) (0)                  \
             \n************************************************\n')
        #* Create Image Transformations Class
        # transfor = Transformations('./img/lemon_img1.jpg')
        # transfor.getPixelRGB(100, 50)
        menu()

    except:
        pass