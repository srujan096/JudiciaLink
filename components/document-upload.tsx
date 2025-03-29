"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { FileText, Upload, FileUp, Trash2, Share2 } from "lucide-react"

type Document = {
  id: number
  name: string
  type: string
  size: string
  uploadDate: string
  status: "analyzed" | "pending" | "shared"
}

export function DocumentUpload() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "Property Agreement.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2025-04-28",
      status: "analyzed",
    },
    {
      id: 2,
      name: "Court Notice.docx",
      type: "DOCX",
      size: "1.2 MB",
      uploadDate: "2025-04-25",
      status: "analyzed",
    },
    {
      id: 3,
      name: "Lease Agreement.pdf",
      type: "PDF",
      size: "3.1 MB",
      uploadDate: "2025-04-20",
      status: "shared",
    },
    {
      id: 4,
      name: "Power of Attorney.pdf",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2025-04-15",
      status: "pending",
    },
    {
      id: 5,
      name: "Affidavit.docx",
      type: "DOCX",
      size: "0.9 MB",
      uploadDate: "2025-04-10",
      status: "analyzed",
    },
  ])

  const [isUploading, setIsUploading] = useState(false)

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
        status: "pending",
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
        <CardDescription>Upload and manage your legal documents</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="documents">My Documents</TabsTrigger>
            <TabsTrigger value="shared">Shared Documents</TabsTrigger>
          </TabsList>
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
          </TabsContent>
          <TabsContent value="documents" className="p-4">
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted p-2 rounded-md">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.type} • {doc.size} • Uploaded on {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View
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
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.size} • Shared on {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View
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

