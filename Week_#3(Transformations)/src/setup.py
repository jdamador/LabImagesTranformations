__author__ = 'Daniel Amador, Brandon Cruz'
__version__ = '1.0'

# * Import libraries
from scripts.functions import Transformations

# Main menu
def menu():
    transfor = Transformations('./img/lemon_img1.jpg')
    print('Choose one of the option below: \
         \n1> Load a new image. \
         \n2> Get RGB for a pixel \
         \n3> Get a region of interest \
         \n4> Resize an image  \
         \n5> Resize an image without change its aspect \
         \n6> Rotate an image  \
         \n7> Smoothing')
    option = input('Type your option: ')
    if option == '1':
        option = input("Type the path of the image: (example: './img/lemon_img1.jpg') >")
        transfor = Transformations(path)
    if option == '2':
        initX = int(input('Type pos X: '))
        initY = int(input('Type pos Y: '))
        transfor.getPixelRGB(initX,initY)
    if option == '3':
        initX = int(input('Type init X: '))
        initY = int(input('Type init Y: '))
        endX = int(input('Type end X: '))
        endY = int(input('Type end Y: '))
        transfor.getROI(initX,initY, endX,endY)
        menu()
    if option == '4':
        width = int(input('Type width: '))
        height = int(input('Type height: '))
        transfor.getImageResize(width, height)
        menu()
    if option == '5':
        transfor.getImageResizeWithoutAltheringAppearance(transfor.img)
        menu()
    if option == '6':
        degrees = int(input('Type degrees: '))
        transfor.getImageRotation(degrees)
        menu()
    if option == '7':
        transfor.getGaussianBlurImage()
        menu()

if __name__ == "__main__":
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
    try:
        menu()
    except:
        menu()
