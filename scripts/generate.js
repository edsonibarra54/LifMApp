import fs from 'node:fs';
import path from 'node:path';

const [, , type, name] = process.argv;

if (!type || !name) {
    console.error('Usage: npm run generate <component|view|layout> <Name>');
    process.exit(1);
}

let route = 0;

switch (type) {
    case 'component':
        route = '/components';
        break;
    case 'view':
        route = '/pages';
        break;
    case 'layout':
        route = '/layouts';
        break;
}

if (type == 0) {
    console.error('Usage: npm run generate <component|view|layout> <Name>');
    process.exit(1);
}

const target = path.join(process.cwd(), 'src', route, name);

if (fs.existsSync(target)) {
    console.error(`Folder "${name}" already exists`);
    process.exit(1);
}

fs.mkdirSync(target);

fs.writeFileSync(path.join(target, `${name}.tsx`),
`import styles from './${name}.module.css';
    
type ${name}Props = {};

export function ${name}({}: ${name}Props) {
    return (
        <div className={styles.${type}}>
            ${name}
        </div>
    );
}`
);

fs.writeFileSync(path.join(target, `${name}.module.css`),
`.${type} {
}`
);

fs.writeFileSync(path.join(target, 'index.ts'),
`export * from './${name}';`
);

const parentIndexPath = path.join(
    path.dirname(target),
    'index.ts',
);

if (!fs.existsSync(parentIndexPath)) {
    fs.writeFileSync(parentIndexPath, '');
}

const exportLine = `export * from './${name}';`;

let content = fs.readFileSync(parentIndexPath, 'utf8');

if (!content.includes(exportLine)) {
  if (content.length > 0 && !content.endsWith('\n')) {
    content += '\n';
  }

  content += `${exportLine}`;

  fs.writeFileSync(parentIndexPath, content);
}

console.log(`${type} "${name}" created`);