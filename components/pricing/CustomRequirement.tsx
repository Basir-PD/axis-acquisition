'use client'

import { motion } from 'framer-motion'
import { Package, PackagePlus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/shared/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function CustomRequirement() {
  return (
    <section className="w-full px-4 py-12 bg-background">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className=" text-xl md:text-4xl font-bold tracking-tight"
          >
            Have custom requirements?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-xs leading-5 lg:text-lg text-muted-foreground"
          >
            We understand that every client is unique. If our pre-defined
            packages don&apos;t perfectly fit your needs, don&apos;t
            worry—we&apos;re here to help. Let&apos;s discuss your requirements
            and create a custom package that delivers exactly what you&apos;re
            looking for, whether it&apos;s extra small, extra large, or anything
            in between.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full transition-all hover:shadow-lg dark:hover:shadow-purple-800">
              <CardHeader>
                <Package className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl">Extra Small</CardTitle>
              </CardHeader>
              <CardContent>
                <p className=" text-sm md:text-base text-muted-foreground">
                  If you&apos;re looking for a very simple holding page with
                  some social media links and contact details, or you&apos;d
                  like to tweak an existing page to match your current
                  promotions, we can help. Feel free to get in touch and
                  we&apos;ll explore the most cost-effective way to deliver you
                  a landing page solution, whatever your needs.
                </p>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="h-full transition-all hover:shadow-lg dark:hover:shadow-purple-800">
              <CardHeader>
                <PackagePlus className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl">Extra Large</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  Sometimes you need something a little special. We&apos;re
                  experts in building engaging web experiences to enhance your
                  marketing efforts and inform users. If you need something
                  out-of-the box, or just more involved than our Large package -
                  contact us now and we can discuss what&apos;s possible.
                </p>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </motion.div>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/contact">
            <Button className="px-10 text-xl">LETS DISCUSS YOUR PROJECT</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
