const { iam, sleep } = require('.');

async function attachPolicyOrServicePermission(role, name) {
  name = name.toLowerCase();
  let policyArn;
  if (name.includes('arn:aws:iam::aws:policy')) {
    policyArn = name;
  } else if (name.includes('translate')) {
    policyArn = 'arn:aws:iam::aws:policy/TranslateReadOnly';
  } else if (name.includes('lambda')) {
    policyArn = 'arn:aws:iam::aws:policy/AWSLambdaExecute';
  } else if (name.includes('lex')) {
    policyArn = 'arn:aws:iam::aws:policy/AmazonLexFullAccess';
  }
  console.log(`Attaching policy ${policyArn} to role ${role.RoleName}...`);
  await iam.attachRolePolicy({
    PolicyArn: policyArn, 
    RoleName: role.RoleName,
  }).promise();
  console.log(`Policy ${policyArn} attached to role ${role.RoleName}.`);
}

async function deleteRole(name) {
  if (name.includes('/')) {
    name = name.split('/')[1];
  }
  console.log(`Deleting role ${name}...`);
  const policies = await iam.listAttachedRolePolicies({ RoleName: name }).promise().catch(() => undefined)
  if (policies) {
    console.log(`Policies for role ${name}: ${policies.AttachedPolicies.map(p=>p.PolicyName).join(',')}`);
    await Promise.all(policies.AttachedPolicies.map(async (policy) => {
      console.log(`Detaching policy ${policy.PolicyArn} from role ${name}...`);
      await iam.detachRolePolicy({ RoleName: name, PolicyArn: policy.PolicyArn }).promise();
      console.log(`Policy ${policy.PolicyArn} detached from role ${name}.`);
    }));
  }
  await sleep(3000);
  await iam.deleteRole({ RoleName: name }).promise();
  console.log(`Role ${name} deleted.`);
}

async function putRole(name, service, policiesOrServiceNames = []) {
  service = service.toLowerCase();
  const roleParams = {
    RoleName: name,
    AssumeRolePolicyDocument: `{
      "Version": "2012-10-17",
      "Statement": [{
        "Effect": "Allow",
        "Principal": {
          "Service": "${service}.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }]
    }`,
  }
  if (service === 'lambda' && !policiesOrServiceNames.find(p=>p.toLowerCase()==='lambda')) {
    policiesOrServiceNames.push('lambda');
  }
  console.log(`Creating role ${name} for service ${service}...`);
  const { Role } = await iam.createRole(roleParams).promise();
  console.log(`Role ${name} for service ${service} created.`);
  await sleep(3000);
  
  await Promise.all(policiesOrServiceNames.map((name) => {
    return attachPolicyOrServicePermission(Role, name)
  }))
  
  await sleep(10000);
  return Role;
}

module.exports = { deleteRole, putRole };
if (require.main === module) {
  const name = process.argv[2];
  const service = process.argv[3];
  const policies = process.argv.slice(4);
  putRole(name, service, policies);
}