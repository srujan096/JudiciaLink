"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Upload, FileUp, Trash2, Share2, Download, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type Document = {
  id: number
  name: string
  type: string
  size: string
  uploadDate: string
  client: string
  caseId: string | null
  status: "draft" | "final" | "shared"
}

export function DocumentManager() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "Property Agreement.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2025-04-28",
      client: "Rajesh Kumar",
      caseId: "CIV-2025-001",
      status: "final",
    },
    {
      id: 2,
      name: "Court Notice.docx",
      type: "DOCX",
      size: "1.2 MB",
      uploadDate: "2025-04-25",
      client: "Rajesh Kumar",
      caseId: "CIV-2025-001",
      status: "shared",
    },
    {
      id: 3,
      name: "Divorce Petition.pdf",
      type: "PDF",
      size: "3.1 MB",
      uploadDate: "2025-04-20",
      client: "Meera Patel",
      caseId: "FAM-2025-002",
      status: "draft",
    },
    {
      id: 4,
      name: "Evidence Document.pdf",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2025-04-15",
      client: "Suresh Sharma",
      caseId: "CRIM-2025-003",
      status: "final",
    },
    {
      id: 5,
      name: "Contract Draft.docx",
      type: "DOCX",
      size: "0.9 MB",
      uploadDate: "2025-04-10",
      client: "Suresh Sharma",
      caseId: "CORP-2025-004",
      status: "draft",
    },
  ])

  const [isUploading, setIsUploading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [clientFilter, setClientFilter] = useState("all")
  const [caseFilter, setCaseFilter] = useState("all")

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (clientFilter === "all" || doc.client === clientFilter) &&
      (caseFilter === "all" || doc.caseId === caseFilter),
  )

  const handleUpload = () => {
    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      const newDocument: Document = {
        id: documents.length + 1,
        name: "New Document.pdf",
        type: "PDF",
        size: "1.5 MB",
        uploadDate: new Date().toISOString().split("T")[0],
        client: "Rajesh Kumar",
        caseId: "CIV-2025-001",
        status: "draft",
      }

      setDocuments([newDocument, ...documents])
      setIsUploading(false)
    }, 2000)
  }

  const handleDelete = (id: number) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Document Management</CardTitle>
        <CardDescription>Manage legal documents for all your cases</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="p-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  <SelectItem value="Rajesh Kumar">Rajesh Kumar</SelectItem>
                  <SelectItem value="Meera Patel">Meera Patel</SelectItem>
                  <SelectItem value="Suresh Sharma">Suresh Sharma</SelectItem>
                </SelectContent>
              </Select>
              <Select value={caseFilter} onValueChange={setCaseFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cases</SelectItem>
                  <SelectItem value="CIV-2025-001">Property Dispute</SelectItem>
                  <SelectItem value="FAM-2025-002">Divorce Proceedings</SelectItem>
                  <SelectItem value="CRIM-2025-003">Fraud Case</SelectItem>
                  <SelectItem value="CORP-2025-004">Contract Dispute</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted p-2 rounded-md">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{doc.name}</p>
                        <Badge
                          variant={
                            doc.status === "final" ? "default" : doc.status === "draft" ? "secondary" : "outline"
                          }
                          className="ml-2"
                        >
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {doc.type} • {doc.size} • Uploaded on {doc.uploadDate}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Client: {doc.client} • Case: {doc.caseId || "None"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(doc.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}

              {filteredDocuments.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No documents found</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="upload" className="p-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
              <FileUp className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Drag and drop your files</h3>
              <p className="text-sm text-muted-foreground mb-4">or click to browse (PDF, DOCX, TXT up to 10MB)</p>
              <div className="flex gap-4">
                <Input id="file-upload" type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" />
                <Button onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Document
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Document Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doc-name">Document Name</Label>
                    <Input id="doc-name" placeholder="Enter document name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-type">Document Type</Label>
                    <Select>
                      <SelectTrigger id="doc-type">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agreement">Agreement</SelectItem>
                        <SelectItem value="petition">Petition</SelectItem>
                        <SelectItem value="notice">Notice</SelectItem>
                        <SelectItem value="evidence">Evidence</SelectItem>
                        <SelectItem value="affidavit">Affidavit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doc-client">Client</Label>
                    <Select>
                      <SelectTrigger id="doc-client">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
                        <SelectItem value="meera">Meera Patel</SelectItem>
                        <SelectItem value="suresh">Suresh Sharma</SelectItem>
                        <SelectItem value="anita">Anita Singh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-case">Related Case</Label>
                    <Select>
                      <SelectTrigger id="doc-case">
                        <SelectValue placeholder="Select case" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CIV-2025-001">Property Dispute</SelectItem>
                        <SelectItem value="FAM-2025-002">Divorce Proceedings</SelectItem>
                        <SelectItem value="CRIM-2025-003">Fraud Case</SelectItem>
                        <SelectItem value="CORP-2025-004">Contract Dispute</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-notes">Notes</Label>
                  <Input id="doc-notes" placeholder="Add notes about this document" />
                </div>
                <Button className="w-full">Save Document Details</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="drafts" className="p-4">
            <div className="space-y-4">
              {documents
                .filter((doc) => doc.status === "draft")
                .map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted p-2 rounded-md">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{doc.name}</p>
                          <Badge variant="secondary" className="ml-2">
                            Draft
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.size} • Uploaded on {doc.uploadDate}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Client: {doc.client} • Case: {doc.caseId || "None"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                ))}

              {documents.filter((doc) => doc.status === "draft").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No draft documents found</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="shared" className="p-4">
            <div className="space-y-4">
              {documents
                .filter((doc) => doc.status === "shared")
                .map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted p-2 rounded-md">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{doc.name}</p>
                          <Badge variant="outline" className="ml-2">
                            Shared
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.size} • Shared on {doc.uploadDate}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Shared with: {doc.client} • Case: {doc.caseId || "None"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}

              {documents.filter((doc) => doc.status === "shared").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No shared documents found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

