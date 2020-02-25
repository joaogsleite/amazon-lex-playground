const { iam, sleep } = require('.');

function policyByService(service) {
  switch (service){
    case 'lambda':
    default:
      return "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole";
  }
}

async function putRole(name, service) {
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
  console.log(`Creating role ${name} for service ${service}...`);
  const { Role } = await iam.createRole(roleParams).promise();
  console.log(`Role ${name} for service ${service} created.`);
  await sleep(3000);
  console.log(`Attaching policy for service ${service} to role ${name}...`);
  await iam.attachRolePolicy({
    PolicyArn: policyByService(service), 
    RoleName: Role.RoleName,
  }).promise();
  console.log(`Policy for service ${service} attached to role ${name}.`);
  await sleep(10000);
  return Role;
}

module.exports = putRole;
if (require.main === module) {
  const name = process.argv[2];
  const service = process.argv[3];
  putRole(name, service);
}