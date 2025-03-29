import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ResourcesSection() {
  return (
    <div className="container mx-auto">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Legal Information</CardTitle>
            <CardDescription>Access comprehensive legal resources</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Find acts, judgments, and procedures from the Indian judiciary system all in one place.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="https://www.indiacode.nic.in/" target="_blank" className="w-full">
              <Button variant="outline" className="w-full">
                India Code
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Find a Lawyer</CardTitle>
            <CardDescription>Connect with legal professionals</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connect with advocates and legal aid services across India for professional assistance.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="https://www.barcouncilofindia.org/" target="_blank" className="w-full">
              <Button variant="outline" className="w-full">
                Bar Council
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Court Services</CardTitle>
            <CardDescription>Track cases and court proceedings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Explore e-Courts services for case status, cause lists, and online filing in Indian courts.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="https://services.ecourts.gov.in/" target="_blank" className="w-full">
              <Button variant="outline" className="w-full">
                e-Courts
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Legal Aid</CardTitle>
            <CardDescription>Free legal assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get free legal aid and support through NALSA for those who cannot afford legal services.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="https://nalsa.gov.in/" target="_blank" className="w-full">
              <Button variant="outline" className="w-full">
                NALSA
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

