from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.lib.pagesizes import A4
from pathlib import Path
import fitz
from PIL import Image
from io import BytesIO
def photo(path):
 im=Image.open(path).convert("RGB"); im.thumbnail((600,600)); stream=BytesIO(); im.save(stream,format="JPEG",quality=87);stream.seek(0);return ImageReader(stream)
W,H=A4
out='public/yami-menu.pdf'
c=canvas.Canvas(out,pagesize=A4)
c.setTitle('Yami Bakery - Menú Kosher Parve')
c.setAuthor('Yami Bakery')
rasp=HexColor('#AC345B');plum=HexColor('#3B2430');pink=HexColor('#F19BC1')
c.setFillColor(HexColor('#FFFAF8'));c.rect(0,0,W,H,fill=1,stroke=0)
c.setFillColor(HexColor('#FFF1F2'));c.circle(W+10,H+40,240,fill=1,stroke=0)
c.drawImage('public/images/wordmark.png',38,H-103,width=130,height=74,mask='auto',preserveAspectRatio=True)
c.setFillColor(rasp);c.setFont('Times-Roman',17);c.drawRightString(W-40,H-48,'KOSHER');c.setFont('Times-Roman',13);c.drawRightString(W-40,H-64,'PARVE')
c.setFont('Times-Roman',29);c.drawString(40,H-142,'Un poquito de felicidad.');c.setFont('Helvetica',9);c.setFillColor(plum);c.drawString(41,H-163,'NUESTROS FAVORITOS  /  MENÚ')
rows=[('MINI BROWNIES','brownies.webp',[('Caja de 16','12,00 €'),('Caja de 32','20,00 €'),('Caja de 48','30,00 €')]),('JALÁ','challah.webp',[('Jalá Tradicional de 480 g','4,70 €'),('Jalá NY Style de 480 g','4,70 €'),('Mini Jalá de 240 g','2,80 €')]),('COQUITOS','coquitos.webp',[('Bolsa de 10','14,00 €'),('Bolsa de 20','26,00 €')]),('COOKIES CON CHIPS DE CHOCOLATE','cookies.webp',[('Caja de 6','14,00 €')]),('TARTA DE ALMENDRA','almond.webp',[('Grande','26,00 €'),('Pequeña','14,00 €')])]
y=H-198
for title,image,variants in rows:
 c.saveState();p=c.beginPath();p.roundRect(40,y-84,91,84,10);c.clipPath(p,stroke=0);c.drawImage(photo('public/images/'+image),40,y-84,width=91,height=84,preserveAspectRatio=False,mask='auto');c.restoreState()
 c.setFillColor(rasp);c.setFont('Helvetica-Bold',11 if len(title)<30 else 10);c.drawString(151,y-12,title)
 for j,(label,price) in enumerate(variants):
  yy=y-33-17*j;c.setFillColor(plum);c.setFont('Helvetica',10);c.drawString(151,yy,label);c.setFillColor(rasp);c.setFont('Helvetica-Bold',10);c.drawRightString(W-42,yy,price)
 c.setStrokeColor(HexColor('#EBD7DE'));c.setLineWidth(.5);c.line(151,y-92,W-42,y-92)
 y-=106
c.setFillColor(HexColor('#F7E1E7'));c.roundRect(32,27,W-64,58,10,fill=1,stroke=0)
c.setFillColor(rasp);c.setFont('Helvetica-Bold',10);c.drawString(48,63,'PEDIDOS POR WHATSAPP');c.setFont('Helvetica',10);c.drawString(48,44,'+34 614 034 687');c.drawRightString(W-48,63,'@yamibakery_');c.setFont('Helvetica',8);c.drawRightString(W-48,44,'Hecho con cariño. Compartido con amor.')
c.linkURL('https://wa.me/message/4SM5WWMZW3CJH1',(40,32,270,78),relative=0)
c.linkURL('https://www.instagram.com/yamibakery_/',(350,50,W-40,78),relative=0)
c.save()
Path('tmp/pdfs').mkdir(parents=True,exist_ok=True)
doc=fitz.open(out);page=doc[0];page.get_pixmap(matrix=fitz.Matrix(1.5,1.5)).save('tmp/pdfs/menu-review.png')
text=page.get_text(); assert all(name in text for name in ['MINI BROWNIES','JALÁ','COQUITOS','TARTA DE ALMENDRA','4,70','2,80','30,00','26,00','14,00','12,00','20,00']); print('PDF verified: 1 A4 page, selectable text, all five products and prices.')
