import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

export default function Carroussel() {
  return (
    <MDBCarousel showControls style={{width:"80%",paddingLeft:"300px"}}>
      <h1 style={{paddingTop:"30px"}}>Créez des règles et des commandes pour automatiser</h1>
      <MDBCarouselItem itemId={1}>
        <img style={{height:"300px"}} src='https://images.ctfassets.net/rz1oowkt5gyp/Wn1UM6FwcYkNYZHPzFDkX/11e151e55b277e5690c5b1742cd486a0/Illo-Flowchart.svg' className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img style= {{height:"300px"}}src='https://files.oaiusercontent.com/file-Rjbzok9XxfS5oqJYofpEJk?se=2025-02-26T10%3A05%3A35Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D0d24715c-6f45-42d1-9472-ddbfe9e8b1dd.webp&sig=SVTvz%2B09uaBqv1Y3cS9oTIJcgg2GgU8MjXUsitr/2I8%3D' className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img style={{height:"300px"}}src='https://applitools.com/wp-content/uploads/2021/03/Tutorial-How-to-Automate-with-Power-Automate-Desktop_831x542.jpg' className='d-block w-100' alt='...' />
      </MDBCarouselItem>
    </MDBCarousel>
  );
}