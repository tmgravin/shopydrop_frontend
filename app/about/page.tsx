import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FaCheckCircle, FaShippingFast, FaTag } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { Container } from './../component/Container';
import Image from "next/image";

const About:React.FC = () => {
  return (
    <Container> 
    <div className="flex flex-col items-center justify-center">
      {/* Our Story Section */}
      <section className="w-full text-center my-12 px-4">
        <Image 
        width={100}
        height={100}
        src="https://png.pngtree.com/thumb_back/fh260/back_pic/02/50/63/71577e1cf59d802.jpg" alt="Our Story Image"  className="mx-auto h-72 w-full" />
        <div className="mt-8">
          <h2 className="text-4xl font-bold">Our Story</h2>
          <p className="text-gray-600 mt-4 leading-relaxed max-w-3xl mx-auto">
            Launched in 2024, ShopfyDrop is South Asia premier online shopping marketplace with an active presence in Online Store
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="w-full bg-gray-100 py-12 px-4">
        <h2 className="text-4xl font-bold text-center">Our Values</h2>
        <div className="flex flex-wrap text-center justify-center gap-8 mt-8">
          <Card className="max-w-sm  h-36">
            <CardContent className="my-auto mt-10">
              <CardTitle className="my-auto">Embrace Change</CardTitle>
              <p className="text-gray-600">We embrace and encourage change...</p>
            </CardContent>
          </Card>
          <Card className="max-w-sm">
            <CardContent>
              <CardTitle className='mt-10'>Teamwork</CardTitle>
              <p className="text-gray-600">We work together, across boundaries...</p>
            </CardContent>
          </Card>
          <Card className="max-w-sm">
            <CardContent>
              <CardTitle className="mt-10">Customer Commitment</CardTitle>
              <p className="text-gray-600">We develop relationships that make...</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="w-full py-12 px-4">
        <h2 className="text-4xl font-bold text-center">Our Promise</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="flex items-center space-x-4">
            <FaTag size={36} className="text-orange-600" />
            <div>
              <h3 className="text-xl font-semibold">Best Prices</h3>
              <p className="text-gray-600">We offer competitive pricing...</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaCheckCircle size={36} className="text-orange-600" />
            <div>
              <h3 className="text-xl font-semibold">Biggest Variety</h3>
              <p className="text-gray-600">We offer the largest selection...</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaShippingFast size={36} className="text-orange-600" />
            <div>
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="text-gray-600">We ensure timely delivery...</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MdOutlineSecurity size={36} className="text-orange-600" />
            <div>
              <h3 className="text-xl font-semibold">100% Protected</h3>
              <p className="text-gray-600">Your purchases are protected...</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </Container>
  );
};

export default About;
