'use client'

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCw,
  Search,
} from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useToast } from './ui/use-toast'
import { useResizeDetector } from 'react-resize-detector'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import SimpleBar from 'simplebar-react'
import PdfFullscreen from './PdfFullscreen'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const pdfScales = [25, 50, 100, 150, 200, 250]

interface PdfRendererProps {
  url: string
}

const PdfRenderer: React.FC<PdfRendererProps> = ({ url }) => {
  const { toast } = useToast()
  const { width, ref } = useResizeDetector()

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  })

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: '1',
    },
    resolver: zodResolver(CustomPageValidator),
  })

  const [numPages, setNumPages] = useState<number | undefined>(undefined)
  const [currPage, setCurrPage] = useState<number>(1)
  const [pdfScale, setPdfScale] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [renderedScale, setRenderedScale] = useState<number | null>(null)

  const isLoading = renderedScale !== pdfScale

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page))
    setValue('page', page)
  }

  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            aria-label="previous page"
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1))
              setValue('page', String(currPage - 1))
            }}
            disabled={currPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              {...register('page')}
              className={cn(
                'w-12 h-8',
                errors.page && 'focus-visible:ring-red-500'
              )}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(handlePageSubmit)()
                }
              }}
            />
            <p className="text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{numPages ?? 'x'}</span>
            </p>
          </div>

          <Button
            variant="ghost"
            aria-label="next page"
            onClick={() => {
              setCurrPage((prev) =>
                prev + 1 > numPages! ? numPages! : prev + 1
              )
              setValue('page', String(currPage + 1))
            }}
            disabled={numPages === undefined || currPage === numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1.5" aria-label="zoom" variant="ghost">
                <Search className="h-4 w-4" />
                {pdfScale * 100} %<ChevronDown className="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {pdfScales.map((scale, i) => (
                <DropdownMenuItem
                  key={i}
                  onSelect={() => setPdfScale(scale / 100)}
                >
                  {scale}%
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            aria-label="rotate 90 degress"
            variant="ghost"
            onClick={() => setRotation((prev) => prev + 90)}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <PdfFullscreen fileUrl={url} />
        </div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: 'Error loading PDF',
                  description: 'Please try again later',
                  variant: 'destructive',
                })
              }}
              file={url}
              className="max-h-full"
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages)
              }}
            >
              {isLoading && renderedScale ? (
                <Page
                  pageNumber={currPage}
                  width={width ? width : 1}
                  scale={pdfScale}
                  rotate={rotation}
                  key={'@' + renderedScale}
                />
              ) : null}

              <Page
                className={cn(isLoading ? 'hidden' : '')}
                pageNumber={currPage}
                width={width ? width : 1}
                scale={pdfScale}
                rotate={rotation}
                key={'@' + pdfScale}
                loading={
                  <div className="flex justify-center">
                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(pdfScale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default PdfRenderer
