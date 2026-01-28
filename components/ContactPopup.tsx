"use client"
import { X } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { z } from "zod"
import Link from "next/link"

interface ContactPopupProps {
  isOpen: boolean
  onClose: () => void
}

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  const initialValues: ContactFormData = {
    name: "",
    email: "",
    subject: "",
    message: "",
  }

  const validate = (values: ContactFormData) => {
    try {
      contactSchema.parse(values)
      return {}
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message
          }
        })
        return errors
      }
      return {}
    }
  }

  const handleSubmit = async (values: ContactFormData, { setSubmitting, setStatus, resetForm }: any) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" })
        resetForm()
        setTimeout(() => {
          onClose()
          setStatus(null)
        }, 2000)
      } else {
        setStatus({ type: "error", message: "Failed to send message. Please try again." })
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to send message. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center py-2">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-background/95 backdrop-blur-md border border-border rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-mono font-light">Get in Touch</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
          {({ isSubmitting, status }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:border-muted-foreground transition-colors"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:border-muted-foreground transition-colors"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:border-muted-foreground transition-colors"
                />
                <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:border-muted-foreground transition-colors resize-none"
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-foreground text-background rounded-lg hover:bg-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <p className={`text-sm text-center ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {status.message}
                </p>
              )}

              <p className="text-xs text-muted-foreground text-center">
                By submitting this form, you agree to our{" "}
                <Link href="/blog/privacy-policy" className="underline hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
