'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from '@/utils/supabase/client'
import { sendEmail } from '@/app/_components/sendEmail'

async function getListingInfo(listingId) {
  const { data, error } = await supabase
    .from('listing')
    .select('createdBy, fullName')
    .eq('id', listingId)
    .single()

  if (error) {
    console.error('Error fetching listing info:', error)
    return null
  }

  return data
}

export default function ListingContactForm({ listingId }) {
  const [open, setOpen] = useState(false)
  const [agentName, setAgentName] = useState('')
  const { toast } = useToast()

  async function onSubmit(formData) {
    const listingInfo = await getListingInfo(listingId)
    if (!listingInfo) {
      toast({
        title: "Error",
        description: "Unable to fetch listing information. Please try again later.",
        variant: "destructive",
      })
      return
    }

    formData.append('agentEmail', listingInfo.createdBy)
    formData.append('agentName', listingInfo.fullName)
    formData.append('listingId', listingId)

    const result = await sendEmail(formData)

    if (result.success) {
      toast({
        title: "Message Sent",
        description: `Your message has been sent successfully to ${listingInfo.fullName}.`,
        duration: 5000, // Display for 5 seconds
      })
      setOpen(false)
    } else {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
        duration: 5000, // Display for 5 seconds
      })
    }
  }

  const handleOpenChange = async (newOpen) => {
    if (newOpen && !agentName) {
      const listingInfo = await getListingInfo(listingId)
      if (listingInfo) {
        setAgentName(listingInfo.fullName)
      }
    }
    setOpen(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
      <Button className="blue-button">Contact Agent</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact {agentName}</DialogTitle>
          <DialogDescription>
            Send a message to the listing agent. They will get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" name="name" placeholder="Your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input id="email" name="email" type="email" placeholder="Your email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Your Phone</Label>
            <Input id="phone" name="phone" type="tel" placeholder="Your phone number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              name="message" 
              placeholder={`I'm interested in this property, ${agentName}...`} 
              required 
            />
          </div>
          <Button type="submit">Send Message</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}