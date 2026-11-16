from PIL import Image, ImageChops, ImageDraw
from pathlib import Path
src=Path('/Users/oleksandr/.t3/userdata/attachments')
prefix='4cf67b44-634a-4451-bb70-3fe3abfcb662-'
out=Path('public/images')
files={'cookies':'d5cbe3ae-0c01-46d5-b67f-01c6f29ec034.png','challah':'d825283f-a9f4-49aa-a6be-976c072a27f0.png','coquitos':'8a513ed1-7b0d-4963-bfa0-2990ba24beaf.jpg'}
for name,file in files.items():
 im=Image.open(src/(prefix+file)).convert('RGB'); im.thumbnail((1500,1500)); im.save(out/(name+'.webp'),quality=88)
menu=Image.open(src/(prefix+'14d07c40-eb63-4f6d-9e45-c3c227116e7a.jpg'))
for name,box in [('brownies',(52,410,230,585)),('almond',(58,1231,234,1378))]:
 menu.crop(box).save(out/(name+'.webp'),quality=94)
logo=Image.open(src/(prefix+'08e825c1-84aa-48b1-8e1f-5d154f80d290.png')).convert('RGBA')
# Only remove the blank margin; preserve the provided lettering and its colors.
logo=logo.crop((143,166,364,292)); logo.save(out/'wordmark.png')
round=Image.open(src/(prefix+'737b2c9a-e95a-4b51-97f7-037d8ba45703.png')).convert('RGBA')
# Preserve circle artwork and remove only surrounding white background.
pixels=round.load()
for y in range(round.height):
 for x in range(round.width):
  if (x-250)**2/225**2+(y-250)**2/228**2>1 and min(pixels[x,y][:3])>240: pixels[x,y]=(255,255,255,0)
round.save(out/'round-logo.png');round.resize((64,64),Image.Resampling.LANCZOS).save(out/'favicon.png')
social=Image.new('RGB',(1200,630),'#FFF1F2'); bread=Image.open(out/'challah.webp'); bread.thumbnail((650,630));social.paste(bread,(550,0)); badge=round.copy();badge.thumbnail((380,380));social.paste(badge,(95,125),badge);social.save(out/'social.jpg',quality=90)
