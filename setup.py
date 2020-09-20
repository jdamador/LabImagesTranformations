__author__ = 'Daniel Amador'
__version__ = '1.0'

# * Import libraries
from scripts.functions import Transformations






if __name__ == "__main__":
    print("/************************************************************\ \nWelcome to Images Tranformation App")



    picOne = Transformations('./img/lemon_img1.jpg')
    picOne.getROI((60,160),(320, 420))