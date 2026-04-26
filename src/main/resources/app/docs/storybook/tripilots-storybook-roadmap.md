# Tripilots Storybook Roadmap

## Source of truth

This document adapts the mandatory roadmap provided in `STORYBOOK_ROADMAP_1.md` to the current repository.

Canonical inputs:

- Tripilots Storybook roadmap
- Tripilots UI kit requirements
- Tripilots Figma file

## Objective

Build a complete Storybook-driven design system for Tripilots with:

- categorized components,
- documented variants and states,
- interaction and accessibility coverage,
- and direct alignment with Figma.

## Delivery phases

### Phase 1: Setup and foundations

- Stabilize Storybook config.
- Define Tripilots tokens in `src/tokens`.
- Add Storybook foundation docs.
- Keep the current product theme stable while the design system grows in parallel.

### Phase 2: Atoms

- Button
- Input
- Checkbox
- Radio
- Typography
- Badge
- Icon
- Avatar
- Divider
- Spinner

### Phase 3: Molecules

- Card
- FormGroup
- Select
- Date and time pickers
- Modal
- Toast
- Tooltip
- Popover
- Tabs
- Pagination
- Breadcrumb
- Accordion
- Stepper

### Phase 4: Organisms

- Navigation
- Header
- Footer
- FormWizard
- ProposalList
- DataTable
- Timeline
- Gallery
- CardGrid

### Phase 5: Templates and pages

- Proposal template
- Landing page template
- Dashboard page
- Destination detail page
- Settings and profile views

### Phase 6: Quality gates

- interaction tests,
- accessibility checks,
- visual regression,
- docs completeness,
- coverage reporting.

### Phase 7: Polish and deployment

- performance review,
- storybook build optimization,
- public deployment,
- onboarding guides.

## Repository-specific decisions

### Architecture

The repo already contains reusable UI primitives in `src/shared/components/ui`.

Because of that, the Tripilots design system will not force a second parallel component architecture immediately. We will:

1. document the target system,
2. map existing primitives to the target taxonomy,
3. then decide which components should stay as shared primitives and which should become Tripilots-specific layers.

### Token strategy

Tripilots tokens live in `src/tokens` as the design-system source of truth.

They are intentionally separated from the current app theme so we can evolve Storybook without destabilizing production UI.

### Coverage strategy

Completion is measured against Figma, not only against the roadmap list.

No component is considered complete until it has:

- base story,
- variants,
- states,
- responsive verification,
- accessibility notes,
- and mapping to the Figma source when relevant.

## Immediate next steps

1. Finish foundation docs and keep Storybook build green.
2. Activate Figma MCP in the running Codex session.
3. Extract the real component inventory from Figma.
4. Build a gap matrix: Figma vs repo vs Storybook.
5. Execute atoms first, then molecules, then Tripilots-specific organisms.
