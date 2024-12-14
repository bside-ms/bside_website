import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                inverted:
                    'border-transparent bg-primary-foreground text-primary hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
                outline: 'text-foreground',
            },
            size: {
                default: 'px-2.5 py-0.5 text-xs',
                small: 'px-1 py-0.5 text-xs',
            },
            hover: {
                default: '',
                disabled: 'pointer-events-none',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, size, hover, ...props }: BadgeProps) => (
    <div className={cn(badgeVariants({ variant, size, hover }), className)} {...props} />
);

export { Badge, badgeVariants };
