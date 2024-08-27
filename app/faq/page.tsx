import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Container } from './../component/Container';
  
  const Faq = () => {
    return (
      <Container>
        <div className="">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex justify-center text-center items-center gap-20 ">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry standard dummy text ever since the 1500s.
              </AccordionContent>
            </AccordionItem>
  
            <AccordionItem value="item-2">
              <AccordionTrigger className="flex justify-center te-center items-center  gap-24">
                Is it styled?
              </AccordionTrigger>
              <AccordionContent>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.
              </AccordionContent>
            </AccordionItem>
  
            {/* Add more AccordionItems as needed */}
          </Accordion>
        </div>
      </Container>
    );
  };
  
  export default Faq;
  