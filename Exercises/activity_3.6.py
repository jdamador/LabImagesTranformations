"""
!   Exercise 3.6: Histogram equalization
    Compute the gray level(luminance) histogram for an image and equalize it so that the tones look better (and the image is less sensitive to exposure settings).
"""

#* Step 1:  convert the color image to luminance.

#* Step 2: compute the histogram, the cumulative distribution and the compensation transfer function.

#* Step 3: Try to increse the "punch" in the image by ensuring that a certain fraction of pixels (say 5%) are mapped to pure black and white.

#* Step 4: Limit the local f'(I) in the faster function. One way to d this is to limit f(I) < rI or f'(I) < r while performing the accumulation, keeping any unacumulated values "in reserve" (I'll let you figure out the exact details)

#* Step 5: Compensate the luminance channel through the lookup table and re-generate the color image using color ratios.

#* Step 6: Color values that are clipped in the original image, i.e. Have one or more saturated color channels, may appear unnatural when remapped to a non-clipped value. Extrend your algorithm to handle this case in some useful way.

