"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProtectedRoute } from "@/components/protected-route"
import { CreditCard, History } from "lucide-react"

// Mock data for transactions
const transactions = [
  { id: 1, date: "2023-06-15", description: "Payment for Harvest Help", amount: 500, status: "Completed" },
  { id: 2, date: "2023-06-10", description: "Tractor Operation", amount: 300, status: "Pending" },
  { id: 3, date: "2023-06-05", description: "Livestock Care", amount: 400, status: "Completed" },
]

export default function Payments() {
  const [paymentMethod, setPaymentMethod] = useState("")

  const handlePayment = () => {
    console.log("Processing payment with", paymentMethod)
    // Implement payment logic here
  }

  return (
    <ProtectedRoute allowedRoles={["farmer", "worker", "admin"]}>
      <div className="w-full px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Payments & Transactions</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" /> Make a Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="googlepay">Google Pay</SelectItem>
                  <SelectItem value="banktransfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full mt-4" onClick={handlePayment} disabled={!paymentMethod}>
                Process Payment
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="mr-2 h-5 w-5" /> Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <Table className="min-w-full divide-y divide-gray-300">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                          Date
                        </TableHead>
                        <TableHead className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Description
                        </TableHead>
                        <TableHead className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Amount
                        </TableHead>
                        <TableHead className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {transaction.date}
                          </TableCell>
                          <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {transaction.description}
                          </TableCell>
                          <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            ₹{transaction.amount}
                          </TableCell>
                          <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {transaction.status}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}

