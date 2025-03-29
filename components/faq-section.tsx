import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <div className="container mx-auto max-w-3xl">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I file a case in an Indian court?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">To file a case in an Indian court, you need to:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-muted-foreground">
              <li>Prepare a petition/plaint with relevant details of your case</li>
              <li>Attach supporting documents and evidence</li>
              <li>Pay the required court fees</li>
              <li>Submit the documents to the filing section of the appropriate court</li>
              <li>Alternatively, use the e-Filing facility available on the e-Courts portal</li>
            </ol>
            <p className="mt-2 text-muted-foreground">
              The specific procedure may vary depending on the type of case and jurisdiction.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>What is legal aid and who is eligible for it?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              Legal aid provides free legal services to eligible individuals under the Legal Services Authorities Act,
              1987. Those eligible include:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
              <li>Women and children</li>
              <li>Members of Scheduled Castes and Scheduled Tribes</li>
              <li>Victims of human trafficking</li>
              <li>Persons with disabilities</li>
              <li>
                Victims of mass disaster, ethnic violence, caste atrocity, flood, drought, earthquake, or industrial
                disaster
              </li>
              <li>Industrial workmen</li>
              <li>Persons in custody</li>
              <li>Persons with annual income below specified limits (varies by state)</li>
            </ul>
            <p className="mt-2 text-muted-foreground">
              You can apply for legal aid at the nearest Legal Services Authority, Taluk Legal Services Committee, or
              District Legal Services Authority.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>How can I check my case status online?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              You can check your case status online through the e-Courts portal (https://services.ecourts.gov.in/) by:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-muted-foreground">
              <li>Visiting the e-Courts services website</li>
              <li>Selecting "Case Status" from the menu</li>
              <li>Choosing the court type (High Court/District Court)</li>
              <li>Selecting the state, district, and court complex</li>
              <li>Entering your case number and year or CNR (Case Number Record) number</li>
            </ol>
            <p className="mt-2 text-muted-foreground">
              You can also download the e-Courts Services mobile app for Android and iOS to check case status on your
              smartphone.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>What documents do I need to file a consumer complaint?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">To file a consumer complaint, you typically need:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
              <li>Complaint application with details of the issue</li>
              <li>Proof of purchase (receipt, invoice, bill)</li>
              <li>Warranty or guarantee card (if applicable)</li>
              <li>Correspondence with the opposite party (emails, letters)</li>
              <li>Sample of defective goods (if possible)</li>
              <li>Photographs or videos showing defects (if applicable)</li>
              <li>Identity and address proof</li>
            </ul>
            <p className="mt-2 text-muted-foreground">
              You can file complaints online through the National Consumer Disputes Redressal Commission website or at
              the appropriate Consumer Forum based on the value of goods or services.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>How long does a typical court case take in India?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">The duration of court cases in India varies widely depending on:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
              <li>Type of case (civil, criminal, family matters, etc.)</li>
              <li>Complexity of the issues involved</li>
              <li>Court's caseload and backlog</li>
              <li>Cooperation between parties</li>
              <li>Availability of witnesses and evidence</li>
            </ul>
            <p className="mt-2 text-muted-foreground">
              Simple matters might be resolved within months, while complex civil litigation can take several years.
              Criminal trials typically take 2-5 years, though some cases may take longer. Fast-track courts and
              alternative dispute resolution mechanisms like mediation can help expedite the process.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

