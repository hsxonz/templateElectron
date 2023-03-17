export interface navigationItem {
  label: string
  icon?: string
  name: string
  params?: { [key: string]: string }
  children?: navigationItem[]
}

const commonNavigations: navigationItem[] = [
  {
    label: 'Home',
    name: 'main.home',
  },
  {
    label: 'About',
    name: 'main.about',
  },
]

export const navigation: navigationItem[] = [...commonNavigations]
